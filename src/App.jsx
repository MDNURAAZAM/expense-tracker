import { useEffect, useState } from "react";
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
    if (entries?.amount > 0) {
      if (isIncome) {
        const id =
          incomeList?.length > 0
            ? incomeList[incomeList.length - 1]?.id + 1
            : 0;
        setIncomeList((prev) => [...prev, { id, ...entries }]);
      } else {
        const id =
          expenseList?.length > 0
            ? expenseList[expenseList.length - 1]?.id + 1
            : 0;
        setExpenseList((prev) => [...prev, { id, ...entries }]);
      }
    } else {
      alert("Please enter a valid amount");
    }
  };

  const handleSort = (type, order) => {
    if (type == "income") {
      if (order == "asc") {
        const sortedList = incomeList.sort((a, b) => a?.amount - b?.amount);
        setIncomeList(sortedList);
      } else {
        const sortedList = incomeList.sort((a, b) => b?.amount - a?.amount);
        setIncomeList(sortedList);
      }
    } else {
      if (order == "asc") {
        setExpenseList((prev) => prev?.sort((a, b) => a?.amount - b?.amount));
      } else {
        setExpenseList((prev) => prev?.sort((a, b) => b?.amount - a?.amount));
      }
    }
  };

  const handleDelete = (type, id) => {
    let confirmDelete = confirm("Do you really want to delete this item?");
    if (confirmDelete) {
      if (type === "income") {
        setIncomeList((prev) => prev.filter((item) => item.id != id));
      } else {
        setExpenseList((prev) => prev.filter((item) => item.id != id));
      }
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
              <IncomeContainer
                incomeList={incomeList}
                handleSort={handleSort}
                handleDelete={handleDelete}
              />
              <ExpenseContainer
                expenseList={expenseList}
                handleSort={handleSort}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
