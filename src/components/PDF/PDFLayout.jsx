import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useTableContext } from "../../pages/dashboard/dashboard-component/TableContext";

// Create styles for the PDF
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 12,
    },
    header: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center",
    },
    table: {
        display: "table",
        width: "auto",
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        width: "20%",
        border: "1px solid black",
        padding: 5,
    },
    tableCell: {
        textAlign: "center",
    },
    footer: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 10,
        color: "gray",
    },
});

// function PDFLayout({ tableData }) {
function PDFLayout({ data }) {
    // const { tableTitle, columns } = useTableContext();
    const { tableTitle, columns } = useTableContext() || {};
    
    // if (!tableTitle || !columns) {
    //     return <Text>Error: Missing context data</Text>;
    // }
    console.log('columns', data)
    return (
        <>
            <Document>
                <Page style={styles.page}>
                    <Text style={styles.header}>{tableTitle}</Text>
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            {columns.map((column, index) => (
                                <Text key={index} style={[styles.tableCol, styles.tableCell]}>{column.key}</Text>
                            ))}
                        </View>
                        {/* Table Rows */}
                        {data.map((row, index) => (
                            <View style={styles.tableRow} key={index}>
                                <Text style={[styles.tableCol, styles.tableCell]}>
                                    {row.product_id}
                                </Text>
                                <Text style={[styles.tableCol, styles.tableCell]}>
                                    {row.product[0].item_name}
                                </Text>
                                <Text style={[styles.tableCol, styles.tableCell]}>
                                    {row.amount.total_amount}
                                </Text>
                                <Text style={[styles.tableCol, styles.tableCell]}>{row.updated_date}</Text>
                                <Text style={[styles.tableCol, styles.tableCell]}>{row.quantity}</Text>
                                <Text style={[styles.tableCol, styles.tableCell]}>
                                    {row.stock_status}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.footer}>
                        Report generated on {new Date().toLocaleDateString()}
                    </Text>
                </Page>
            </Document>
        </>
    )
}

export default PDFLayout;
