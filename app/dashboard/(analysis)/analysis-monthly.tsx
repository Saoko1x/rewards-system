import { ScrollView } from "react-native";
import Container from "~/components/Container";
import BarsChart from "~/components/dashboard/analysis/BarsChart";
import ExpensesAndRevenues from "~/components/dashboard/analysis/ExpensesAndRevenues";
import Payments from "~/components/dashboard/analysis/Payments";
import PurchasesChart from "~/components/dashboard/analysis/PurchasesChart";

export default function Monthly() {
  return (
    <ScrollView>
      <Container className="mb-16">
        <BarsChart />
        <ExpensesAndRevenues ingresos={8000} gastos={6000} />
        <Payments />
        <PurchasesChart />
      </Container>
    </ScrollView>
  );
}
