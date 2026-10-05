import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddCustomerModal } from "@/components/add-customer-modal";
import { CustomerRow } from "@/components/customer-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useCustomers } from "@/hooks/use-customers";
import { useProfile } from "@/hooks/use-profile";
import { useTheme } from "@/hooks/use-theme";

export default function CustomersScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { status, customers, problem, retry } = useCustomers();
  const profile = useProfile();
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);

  if (status === "loading")
    return (
      <ThemedView style={styles.middle}>
        <ActivityIndicator size="large" />
        <ThemedText themeColor="textSecondary">Loading customers</ThemedText>
      </ThemedView>
    );

  if (status === "error")
    return (
      <ThemedView style={styles.middle}>
        <ThemedText>{problem}</ThemedText>
        <Button title="Try again" onPress={retry} />
      </ThemedView>
    );

  if (status === "empty")
    return (
      <ThemedView style={styles.middle}>
        <ThemedText>No customers yet.</ThemedText>
      </ThemedView>
    );

  const shown = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );
  const total = shown.reduce((sum, c) => sum + c.balance, 0);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search customers"
          placeholderTextColor={theme.textSecondary}
          style={[
            styles.search,
            { color: theme.text, borderColor: theme.textSecondary },
          ]}
        />
        {profile?.role === "admin" && (
          <Button title="Add customer" onPress={() => setAdding(true)} />
        )}
      </View>

      <ThemedText style={styles.total}>
        Total owed: ₱ {total.toFixed(2)}
      </ThemedText>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <ThemedText style={[styles.listTitle, styles.nameCol]}>
            Customer Name
          </ThemedText>
          <ThemedText style={[styles.listTitle, styles.balanceCol]}>
            Balance
          </ThemedText>
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
          ListEmptyComponent={
            <ThemedText themeColor="textSecondary">
              No customers match &quot;{query}&quot;.
            </ThemedText>
          }
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

const styles = StyleSheet.create({
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.three,
  },
  screen: { flex: 1, padding: Spacing.four, gap: Spacing.three },
  header: { gap: Spacing.two },
  search: { borderWidth: 1, borderRadius: Spacing.two, padding: Spacing.three },
  total: { fontSize: 18 },
  table: { flex: 1 },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listTitle: { fontWeight: "bold" },
  nameCol: { flex: 2 },
  balanceCol: { flex: 1, textAlign: "right" },
});
