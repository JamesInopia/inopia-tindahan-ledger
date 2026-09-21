import {
  ActivityIndicator,
  Button,
  FlatList,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomerRow } from "@/components/customer-row";
import { ThemedView } from "@/components/themed-view";
import { fetchCustomers, type Customer } from "@/data/customers";
import { problemFor, type Status } from "@/data/problem";
import { styles } from "@/styles";
import { Text } from "expo-router/build/react-navigation";
import { useEffect, useState } from "react";

function TitleText() {
  return (
    <View style={styles.titleRow}>
      <Text style={styles.title}>Customer List</Text>
    </View>
  );
}

export default function HomeScreen() {
  const [status, setStatus] = useState<Status>("loading");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [problem, setProblem] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const centered = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  } as const;

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    fetchCustomers()
      .then((rows) => {
        if (cancelled) return;
        setCustomers(rows);
        setStatus(rows.length === 0 ? "empty" : "content");
      })
      .catch((e) => {
        if (cancelled) return;
        setProblem(problemFor(e));
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const shown = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  const total = shown.reduce((sum, c) => sum + c.balance, 0);

  function addWalkIn() {
    const id = String(Date.now());
    const walkIn = { id, name: "Walk-in", balance: 0, lastPaid: "Never" };
    setCustomers([...customers, walkIn]);
  }

  if (status === "loading")
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={centered}>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      </ThemedView>
    );

  if (status === "error")
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={centered}>
          <Text>{problem}</Text>
          <Button title="Try again" onPress={() => setAttempt(attempt + 1)} />
        </SafeAreaView>
      </ThemedView>
    );

  if (status === "empty")
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={centered}>
          <Text>No customers yet.</Text>
        </SafeAreaView>
      </ThemedView>
    );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TitleText></TitleText>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search customers"
            style={{
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              alignSelf: "stretch",
            }}
          ></TextInput>
          <Button title="Add Customer" onPress={addWalkIn}></Button>
        </View>
        <Text style={{ fontSize: 18 }}>Total owed: P {total.toFixed(2)}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.listTitle, styles.nameCol]}>
              Customer Name
            </Text>
            <Text style={[styles.listTitle, styles.balanceCol]}>Balance</Text>
          </View>
          <FlatList
            data={shown}
            keyExtractor={(c) => c.id}
            renderItem={({ item }) => <CustomerRow {...item} />}
            ListEmptyComponent={<Text>No customers match query...</Text>}
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
