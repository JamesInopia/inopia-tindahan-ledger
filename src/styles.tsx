import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Spacing.four,
    alignItems: "center",
  },
  safeArea: {
    width: "100%",
    alignSelf: "stretch",
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.four,
  },
  searchHost: {
    width: "100%",
  },
  table: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  nameCol: {
    flex: 2,
    textAlign: "left",
  },
  balanceCol: {
    flex: 1,
    textAlign: "right",
  },
  titleRow: {
    flexDirection: "row",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "justify",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  listItem: {
    fontSize: 18,
  },
  lastPaidText: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  code: {
    textTransform: "uppercase",
  },
});
