import { CustomTheme } from '@src/type/theme';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import React, { PropsWithChildren } from 'react';
import global from '@src/common/styles';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

/**
 * 客服页
 */
export default function WithdrawScreen() {
  const theme = useTheme() as CustomTheme;

  return (
    <SafeAreaView style={[{ backgroundColor: theme.colors.card }]}>
      <View style={[styles['flex-row']]}>
        <ScrollView style={[styles['w-100']]} />
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={[{ backgroundColor: theme.colors.border }]}>
          <Header />
          <View style={[{ backgroundColor: theme.colors.border }]}>
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">Read the docs to discover what to do next:</Section>

            <LearnMoreLinks />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/**
 * 自定义组件
 */
function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

// 样式
const styles = StyleSheet.create({
  ...global,
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
