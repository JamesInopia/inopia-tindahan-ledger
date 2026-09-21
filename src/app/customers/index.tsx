import {
  ActivityIndicator,
  Button,
  FlatList,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddCustomerModal } from "@/components/add-customer-modal";
import { CustomerRow } from "@/components/customer-row";
import { ThemedView } from "@/components/themed-view";
import { useCustomers } from "@/hooks/use-customers";
import { styles } from "@/styles";
import { useRouter } from "expo-router";
import { Text } from "expo-router/build/react-navigation";
import { useState } from "react";

const centered = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  gap: 12,
} as const;

export default function CustomersScreen() {
  const router = useRouter();
  const { status, customers, problem, retry } = useCustomers();
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);

  const shown = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  const total = shown.reduce((sum, c) => sum + c.balance, 0);

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
          <Button title="Try again" onPress={retry} />
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
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
        <Button title="Add customer" onPress={() => setAdding(true)} />
      </View>
      <Text style={{ fontSize: 18 }}>Total owed: P {total.toFixed(2)}</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.listTitle, styles.nameCol]}>Customer Name</Text>
          <Text style={[styles.listTitle, styles.balanceCol]}>Balance</Text>
        </View>
        <FlatList
          data={shown}
          keyExtractor={(c) => c.id}
          renderItem={({ item }) => (
            <CustomerRow
              name={item.name}
              balance={item.balance}
              onPress={() => router.push(`/customers/${item.id}`)}
            />
          )}
          ListEmptyComponent={<Text>No customers match query...</Text>}
        />
      </View>
      <AddCustomerModal
        visible={adding}
        onClose={() => setAdding(false)}
        onAdded={retry}
      />
    </SafeAreaView>
  );
}
