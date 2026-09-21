import { useState } from "react";
import { Button, Modal, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { addCustomer } from "@/data/customers";
import { problemFor } from "@/data/problem";
import { useTheme } from "@/hooks/use-theme";

type AddCustomerModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdded: () => void;
};

export function AddCustomerModal({
  visible,
  onClose,
  onAdded,
}: AddCustomerModalProps) {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);
  const [problem, setProblem] = useState("");

  const balance = Number(amount);
  const valid =
    name.trim() !== "" &&
    amount !== "" &&
    !Number.isNaN(balance) &&
    balance >= 0;

  function close() {
    setName("");
    setAmount("");
    setProblem("");
    setSaving(false);
    onClose();
  }

  function save() {
    setSaving(true);
    setProblem("");
    addCustomer(name.trim(), balance)
      .then(() => {
        close();
        onAdded();
      })
      .catch((e) => {
        setProblem(problemFor(e));
        setSaving(false);
      });
  }

  const input = {
    borderWidth: 1,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    color: theme.text,
    borderColor: theme.textSecondary,
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={close}
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View
          style={{
            backgroundColor: theme.background,
            padding: Spacing.four,
            gap: Spacing.three,
            borderTopLeftRadius: Spacing.four,
            borderTopRightRadius: Spacing.four,
          }}
        >
          <ThemedText type="subtitle">New customer</ThemedText>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor={theme.textSecondary}
            editable={!saving}
            style={input}
          />
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Amount owed"
            placeholderTextColor={theme.textSecondary}
            keyboardType="decimal-pad"
            editable={!saving}
            style={input}
          />

          {problem !== "" && <ThemedText>{problem}</ThemedText>}

          <View style={{ flexDirection: "row", gap: Spacing.three }}>
            <View style={{ flex: 1 }}>
              <Button title="Cancel" onPress={close} disabled={saving} />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title={saving ? "Saving" : "Add"}
                onPress={save}
                disabled={!valid || saving}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
