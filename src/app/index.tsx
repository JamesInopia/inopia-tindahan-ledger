import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ShareBar } from "@/components/share-bar";
import { Stat } from "@/components/stat";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { summarise } from "@/data/summary";
import { useCustomers } from "@/hooks/use-customers";
import { useTheme } from "@/hooks/use-theme";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { status, customers, problem, retry } = useCustomers();

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
        <Button title="Try again" onPress={retry} />
      </ThemedView>
    );

  if (status === "empty")
    return (
      <ThemedView style={styles.middle}>
        <ThemedText>No customers yet.</ThemedText>
      </ThemedView>
    );

  const summary = summarise(customers);
  const card = { backgroundColor: theme.backgroundElement };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <ThemedText type="small" themeColor="textSecondary">
              SARI-SARI STORE
            </ThemedText>
            <ThemedText type="title">Tindahangelo</ThemedText>
          </View>

          <View style={[styles.card, card]}>
            <View style={styles.statRow}>
              <Stat
                label="Total owed"
                value={`₱ ${summary.total.toFixed(2)}`}
              />
              <Stat
                label="Average owed"
                value={`₱ ${summary.average.toFixed(2)}`}
              />
            </View>
            <View style={styles.statRow}>
              <Stat
                label="Still owing"
                value={`${summary.owing} of ${summary.count}`}
              />
              <Stat label="Settled" value={String(summary.settled)} />
            </View>
          </View>

          <View style={[styles.card, card]}>
            <ThemedText type="small" themeColor="textSecondary">
              Share of what is owed
            </ThemedText>
            {summary.ranked.map((c) => (
              <ShareBar
                key={c.id}
                name={c.name}
                balance={c.balance}
                share={c.share}
              />
            ))}
          </View>

          <Pressable
            style={styles.button}
            onPress={() => router.push("/customers")}
          >
            <Text style={styles.buttonText}>View customers</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
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
  screen: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  header: { gap: Spacing.one },
  card: { borderRadius: 16, padding: Spacing.three, gap: Spacing.three },
  statRow: { flexDirection: "row", gap: Spacing.three },
  button: {
    backgroundColor: "#3c87f7",
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: "center",
  },
  buttonText: { color: "#ffffff", fontWeight: "600", fontSize: 16 },
});
