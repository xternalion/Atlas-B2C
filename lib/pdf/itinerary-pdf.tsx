import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import type { ItineraryResult } from "@/lib/ai";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, color: "#1a1a1a" },
  header: { marginBottom: 24, borderBottom: "2 solid #dd9e5e", paddingBottom: 12 },
  brand: { fontSize: 10, color: "#dd9e5e", fontWeight: 700, letterSpacing: 2, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: 700 },
  summary: { fontSize: 11, color: "#555", marginTop: 8, lineHeight: 1.4 },
  day: { marginBottom: 16 },
  dayTitle: { fontSize: 13, fontWeight: 700, color: "#a0622e", marginBottom: 4 },
  activity: { fontSize: 11, marginBottom: 3, lineHeight: 1.4 },
  footer: { marginTop: 24, paddingTop: 12, borderTop: "1 solid #ddd", fontSize: 9, color: "#888" },
});

function ItineraryDocument({ itinerary }: { itinerary: ItineraryResult }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>ATLAS TRAVEL · WANDERMIND ITINERARY</Text>
          <Text style={styles.title}>{itinerary.title}</Text>
          <Text style={styles.summary}>{itinerary.summary}</Text>
        </View>

        {itinerary.days.map((day) => (
          <View key={day.day} style={styles.day}>
            <Text style={styles.dayTitle}>
              Day {day.day} — {day.title}
            </Text>
            {day.activities.map((activity, i) => (
              <Text key={i} style={styles.activity}>
                • {activity}
              </Text>
            ))}
          </View>
        ))}

        {itinerary.estimatedBudget && (
          <Text style={styles.activity}>Estimated budget: {itinerary.estimatedBudget}</Text>
        )}
        {itinerary.notes && (
          <View style={styles.footer}>
            <Text>{itinerary.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}

export async function renderItineraryPdf(itinerary: ItineraryResult): Promise<Buffer> {
  return renderToBuffer(<ItineraryDocument itinerary={itinerary} />);
}
