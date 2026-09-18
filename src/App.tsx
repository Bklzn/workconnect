import PrimaryButton from "./components/PrimaryButton";
import { TableDemo } from "./components/Table";
import { Plus } from "lucide-react";
import { products } from "./products";

function App() {
  return (
    <div className="w-full max-w-6xl mx-auto flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="flex w-full justify-space-between mb-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl font-semibold my-1">Produkty</h1>
          <p className="text-sm text-muted-foreground">
            {products.length} produktów w katalogu
          </p>
        </div>
        <PrimaryButton className="ml-auto my-auto rounded-xl">
          <Plus className="mr-2 h-4 w-4" />
          Dodaj produkt
        </PrimaryButton>
      </div>
      <TableDemo />
    </div>
  );
}

export default App;
