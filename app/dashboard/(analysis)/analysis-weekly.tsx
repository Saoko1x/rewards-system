import { ScrollView } from "react-native";
import Container from "~/components/Container";
import BarsChart from "~/components/dashboard/analysis/BarsChart";
import ExpensesAndRevenues from "~/components/dashboard/analysis/ExpensesAndRevenues";
import Payments from "~/components/dashboard/analysis/Payments";
import PurchasesChart from "~/components/dashboard/analysis/PurchasesChart";

export default function Weekly() {
  return (
    <ScrollView>
      <Container className="mb-16">
        <BarsChart />
        <ExpensesAndRevenues ingresos={2000} gastos={1500} />
        <Payments />
        <PurchasesChart />
      </Container>
    </ScrollView>
  );
}
