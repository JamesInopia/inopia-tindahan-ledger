import { View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";

type StatProps = { label: string; value: string };

export function Stat({ label, value }: StatProps) {
  return (
    <View style={{ gap: Spacing.one, flex: 1, minWidth: 120 }}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText
        type="subtitle"
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{ fontSize: 24, lineHeight: 32 }}
      >
        {value}
      </ThemedText>
    </View>
  );
}
