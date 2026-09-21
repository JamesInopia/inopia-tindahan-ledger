// src/components/customer-row.tsx
import { styles } from "@/styles";
import { Text } from "expo-router/build/react-navigation";
import { Pressable, View } from "react-native";

type CustomerRowProps = {
  name: string;
  balance: number;
  onPress: () => void;
};

export function CustomerRow({ name, balance, onPress }: CustomerRowProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.tableRow}>
        <View style={styles.nameCol}>
          <Text style={styles.listItem}>{name}</Text>
        </View>
        <Text style={[styles.listItem, styles.balanceCol]}>
          ₱{balance.toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
}
