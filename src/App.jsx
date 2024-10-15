import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SubmissionForm from "./components/SubmissionForm/SubmissionForm";
import BalanceStatistics from "./components/BalaceStatistics/BalanceStatistics";
import IncomeContainer from "./components/IncomeContainer/IncomeContainer";
import ExpenseContainer from "./components/ExpenseContainer/ExpenseContainer";

function App() {
  const [isIncome, setIsIncome] = useState(false);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  const handleSave = (category, amount, date) => {
    const entries = {
      category,
      amount: parseInt(amount),
      date,
    };
    console.log(entries);
    if (isIncome) {
      const id =
        incomeList?.length > 0 ? incomeList[incomeList.length - 1]?.id + 1 : 0;
      setIncomeList((prev) => [...prev, { id, ...entries }]);
    } else {
      const id =
        expenseList?.length > 0
          ? expenseList[expenseList.length - 1]?.id + 1
          : 0;
      setExpenseList((prev) => [...prev, { id, ...entries }]);
    }
  };

  const netIncome = incomeList?.reduce((a, b) => a + b.amount, 0);
  const netExpense = expenseList?.reduce((a, b) => a + b.amount, 0);

  return (
    <>
      <Navbar />
      <main className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SubmissionForm
            isIncome={isIncome}
            setIsIncome={setIsIncome}
            onSave={handleSave}
          />
          <div className="lg:col-span-2">
            <BalanceStatistics netExpense={netExpense} netIncome={netIncome} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <IncomeContainer />
              <ExpenseContainer />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
