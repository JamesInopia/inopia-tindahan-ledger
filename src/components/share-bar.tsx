import { View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

type ShareBarProps = { name: string; balance: number; share: number };

export function ShareBar({ name, balance, share }: ShareBarProps) {
  const theme = useTheme();

  return (
    <View style={{ gap: Spacing.one }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ThemedText type="small">{name}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          ₱ {balance.toFixed(2)} · {Math.round(share * 100)}%
        </ThemedText>
      </View>
      <View
        style={{
          height: 8,
          borderRadius: 4,
          backgroundColor: theme.backgroundSelected,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: 8,
            width: `${Math.max(share * 100, 2)}%`,
            backgroundColor: "#3c87f7",
          }}
        />
      </View>
    </View>
  );
}
