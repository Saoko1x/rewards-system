import { ScrollView } from "react-native";
import Container from "~/components/Container";
import BarsChart from "~/components/dashboard/analysis/BarsChart";
import ExpensesAndRevenues from "~/components/dashboard/analysis/ExpensesAndRevenues";
import Payments from "~/components/dashboard/analysis/Payments";
import PurchasesChart from "~/components/dashboard/analysis/PurchasesChart";

export default function Yearly() {
  return (
    <ScrollView>
      <Container className="mb-16">
        <BarsChart />
        <ExpensesAndRevenues ingresos={96000} gastos={72000} />
        <Payments />
        <PurchasesChart />
      </Container>
    </ScrollView>
  );
}
