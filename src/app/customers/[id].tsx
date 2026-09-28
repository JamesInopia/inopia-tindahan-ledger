import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { fetchCustomer, type Customer } from "@/data/customers";
import { problemFor, type Status } from "@/data/problem";

export default function CustomerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [status, setStatus] = useState<Status>("loading");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [problem, setProblem] = useState("");

  useEffect(() => {
    let live = true;
    fetchCustomer(id)
      .then((row) => {
        if (live) {
          setCustomer(row);
          setStatus("content");
        }
      })
      .catch((e) => {
        if (live) {
          setProblem(problemFor(e));
          setStatus("error");
        }
      });
    return () => {
      live = false;
    };
  }, [id]);

  if (status === "loading")
    return (
      <ThemedView style={styles.middle}>
        <ActivityIndicator />
      </ThemedView>
    );

  if (status === "error")
    return (
      <ThemedView style={styles.middle}>
        <ThemedText>{problem}</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView style={styles.screen}>
      <Stack.Screen options={{ title: customer!.name }} />
      <ThemedText type="title">₱ {customer!.balance.toFixed(2)}</ThemedText>
      <ThemedText themeColor="textSecondary">
        Last paid {customer!.lastPaid}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.three,
  },
  screen: { flex: 1, padding: Spacing.four, gap: Spacing.three },
});
