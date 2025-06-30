import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { formatDateNumeric } from "../../../utils/Formatters";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
  },

  // Header
  header: {
    textAlign: "center",
    marginBottom: 25,
    borderBottom: "2px solid #333",
    paddingBottom: 15,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },

  // Info Section
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  infoGroup: {
    flex: 1,
    paddingRight: 10,
  },
  infoGroupRight: {
    flex: 1,
    paddingLeft: 130,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  infoLabel: {
    width: 100,
    fontWeight: "bold",
  },
  infoValue: {
    flex: 1,
  },

  // Table
  table: {
    marginBottom: 25,
    border: "1px solid #333",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #333",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    minHeight: 25,
  },
  tableCell: {
    padding: 8,
    fontSize: 9,
    borderRight: "1px solid #ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  tableCellHeader: {
    fontWeight: "bold",
    textAlign: "center",
  },

  // Column widths
  colNo: { width: "10%" },
  colItem: { width: "50%" },
  colQty: { width: "20%" },
  colWeight: { width: "20%" },

  // Summary
  summary: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 30,
    paddingTop: 10,
    borderTop: "1px solid #ccc",
  },
  summaryText: {
    fontSize: 9,
    fontWeight: "bold",
    marginRight: 20,
  },

  signature: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  signatureBox: {
    textAlign: "center",
    width: "40%",
  },
  signatureTitle: {
    fontWeight: "bold",
    marginBottom: 50,
  },
  signatureLine: {
    borderTop: "1px solid #333",
    paddingTop: 15,
  },
});

export const SuratJalanPDF = ({ delivery }) => {
  const totalWeight =
    delivery.items?.reduce((sum, item) => {
      const weight = parseFloat(item.weight) || 0;
      return sum + weight;
    }, 0) || 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.companyName}>PT. ADY TRANS JAYA</Text>
          <Text style={styles.documentTitle}>SURAT JALAN</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoGroup}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>No. Surat</Text>
              <Text style={styles.infoValue}>: {delivery.delivery_code}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tanggal</Text>
              <Text style={styles.infoValue}>
                : {formatDateNumeric(delivery.created_at)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Pengemudi</Text>
              <Text style={styles.infoValue}>
                : {delivery.driver.name || "-"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>No. Kendaraan</Text>
              <Text style={styles.infoValue}>
                : {delivery.vehicle.license_plate || "-"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Jenis Kendaraan</Text>
              <Text style={styles.infoValue}>
                : {delivery.vehicle.type || "-"}
              </Text>
            </View>
          </View>

          <View style={styles.infoGroupRight}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Kepada</Text>
              <Text style={styles.infoValue}>
                : {delivery.transaction.customer.name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>No Telepon</Text>
              <Text style={styles.infoValue}>
                : {delivery.transaction.customer.phone}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Perusahaan/Toko</Text>
              <Text style={styles.infoValue}>
                : {delivery.transaction.customer.company || "-"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Alamat Penjemputan</Text>
              <Text style={styles.infoValue}>
                : {delivery.pickup_address || "-"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Alamat Tujuan</Text>
              <Text style={styles.infoValue}>
                : {delivery.destination_address || "-"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginBottom: 20,
            padding: 10,
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
          }}
        >
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={{ fontSize: 9, width: 120, fontWeight: "bold" }}>
              Tanggal Pengiriman
            </Text>
            <Text style={{ fontSize: 9 }}>
              : {formatDateNumeric(delivery.delivery_date)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={{ fontSize: 9, width: 120, fontWeight: "bold" }}>
              Batas Waktu Pengiriman
            </Text>
            <Text style={{ fontSize: 9 }}>
              : {formatDateNumeric(delivery.delivery_deadline_date)}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
            paddingTop: 10,
          }}
        >
          <Text style={{ fontSize: 9, fontWeight: "bold" }}>
            Jenis Muatan: {delivery.load_type}
          </Text>
          <Text style={{ fontSize: 9, fontWeight: "bold" }}>
            Total Item: {delivery.total_item || 0}
          </Text>
          <Text style={{ fontSize: 9, fontWeight: "bold" }}>
            Total Berat: {delivery.total_weight || totalWeight} Kg
          </Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text
              style={[styles.tableCell, styles.tableCellHeader, styles.colNo]}
            >
              No
            </Text>
            <Text
              style={[styles.tableCell, styles.tableCellHeader, styles.colItem]}
            >
              Nama Barang
            </Text>
            <Text
              style={[styles.tableCell, styles.tableCellHeader, styles.colQty]}
            >
              Jumlah
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                styles.colWeight,
              ]}
            >
              Berat (Kg)
            </Text>
          </View>

          {delivery.items?.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.colNo]}>{index + 1}</Text>
              <Text style={[styles.tableCell, styles.colItem]}>
                {item.item_name || "-"}
              </Text>
              <Text style={[styles.tableCell, styles.colQty]}>
                {item.quantity || "-"}
              </Text>
              <Text style={[styles.tableCell, styles.colWeight]}>
                {item.weight || "-"}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.signature}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureTitle}>Pengirim</Text>
            <Text style={styles.signatureLine}>
              (..................................................................)
            </Text>
          </View>

          <View style={styles.signatureBox}>
            <Text style={styles.signatureTitle}>Penerima</Text>
            <Text style={styles.signatureLine}>
              (..................................................................)
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
