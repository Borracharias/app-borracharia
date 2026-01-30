import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image as PdfImage,
} from "@react-pdf/renderer";
import type { Pedido } from "@/lib/api-client";
import { formatCurrency, formatDateFull } from "@/utils/utils";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "column",
  },
  logo: {
    width: 120,
    height: 120,
    objectFit: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F2A44",
  },
  subtitle: {
    fontSize: 12,
    color: "#666666",
    marginTop: 5,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  clientInfo: {
    marginBottom: 20,
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    marginBottom: 8,
    color: "#000000",
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "55%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#bfbfbf",
    backgroundColor: "#E4E4E4",
    padding: 5,
  },
  tableColHeaderSmall: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#bfbfbf",
    backgroundColor: "#E4E4E4",
    padding: 5,
  },
  tableCol: {
    width: "55%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#bfbfbf",
    padding: 5,
  },
  tableColSmall: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#bfbfbf",
    padding: 5,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  totalSection: {
    marginTop: 20,
    alignItems: "flex-end",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F2A44",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "grey",
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    paddingTop: 10,
  },
});

interface OrderPdfProps {
  pedido: Pedido;
}

const OrderPdf = ({ pedido }: OrderPdfProps) => {
  const items = pedido.itens || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Detalhes do Pedido</Text>
            <Text style={styles.subtitle}>
              Pedido #{pedido.id.slice(0, 8).toUpperCase()}
            </Text>
          </View>
          {/* Logo path must be relative to the public folder or absolute URL */}
          {/* Since this runs client-side/node, for react-pdf we often need full URL or base64 */}
          {/* Using window.location.origin to get base URL if in browser context */}
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <PdfImage style={styles.logo} src="/logo-pdf.png" />
        </View>

        <View style={styles.clientInfo}>
          <Text style={styles.label}>Cliente:</Text>
          <Text style={styles.value}>
            {pedido.cliente?.name || "Cliente não identificado"}
          </Text>

          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{formatDateFull(pedido.createdAt)}</Text>

          {pedido.cliente?.phone && (
            <>
              <Text style={styles.label}>Telefone:</Text>
              <Text style={styles.value}>{pedido.cliente.phone}</Text>
            </>
          )}

          {pedido.garantia && (
            <>
              <Text
                style={{
                  ...styles.label,
                  fontSize: 12,
                  fontWeight: "bold",
                  marginTop: 10,
                  marginBottom: 5,
                  color: "#0F2A44",
                }}
              >
                Garantia (1 ano)
              </Text>

              <Text style={styles.label}>Placa do Veículo:</Text>
              <Text style={styles.value}>{pedido.garantia.carPlate}</Text>

              <Text style={styles.label}>Quilometragem:</Text>
              <Text style={styles.value}>{pedido.garantia.mileage} km</Text>

              <Text style={styles.label}>Termos:</Text>
              <Text style={styles.value}>{pedido.garantia.terms}</Text>
            </>
          )}
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Item</Text>
            </View>
            <View style={styles.tableColHeaderSmall}>
              <Text style={styles.tableCellHeader}>Qtd</Text>
            </View>
            <View style={styles.tableColHeaderSmall}>
              <Text style={styles.tableCellHeader}>Preço Unit.</Text>
            </View>
            <View style={styles.tableColHeaderSmall}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
          </View>

          {items.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {item.pneu
                    ? `Pneu (${item.pneu.size})`
                    : item.servico?.name || "Item desconhecido"}
                </Text>
              </View>
              <View style={styles.tableColSmall}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableColSmall}>
                <Text style={styles.tableCell}>
                  {formatCurrency(item.unitPrice)}
                </Text>
              </View>
              <View style={styles.tableColSmall}>
                <Text style={styles.tableCell}>
                  {formatCurrency(item.subTotal)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalText}>
            Total: {formatCurrency(pedido.total || 0)}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Obrigado pela preferência!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderPdf;
