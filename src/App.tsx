import { useMemo, useState } from "react";
import PrimaryButton from "./components/PrimaryButton";
import { TableDemo } from "./components/Table";
import { Plus } from "lucide-react";
import { products } from "./data/products";
import type { Product } from "./data/products";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import { toast, Toaster } from "./components/ui/toast";
import AddProductDialogContent from "./components/AddProductDialog";
import { useAddProductForm } from "./components/addProduct/useAddProductForm";
import { toProduct } from "./lib/toProduct";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogStep, setDialogStep] = useState(1);
  const [attempted, setAttempted] = useState(false);
  const [productList, setProductList] = useState<Product[]>(products);
  const { form } = useAddProductForm();
  const existingSkus = useMemo(
    () => productList.map((product) => product.sku.trim().toUpperCase()),
    [productList],
  );

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (open) {
      setAttempted(false);
      setDialogStep(1);
    }
  };

  const handleSave = () => {
    const product = toProduct(form.state.values);
    setProductList((prev) => [product, ...prev]);
    form.reset();
    setAttempted(false);
    setDialogStep(1);
    setIsDialogOpen(false);

    toast.add({
      title: "Produkt został dodany",
      type: "success",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="flex w-full justify-space-between mb-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl font-semibold my-1">Produkty</h1>
          <p className="text-sm text-muted-foreground">
            {productList.length} produktów w katalogu
          </p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={handleDialogOpenChange}
          disablePointerDismissal
        >
          <DialogTrigger
            render={
              <PrimaryButton className="ml-auto my-auto rounded-xl">
                <Plus className="mr-2 h-4 w-4" />
                Dodaj produkt
              </PrimaryButton>
            }
          />
          <AddProductDialogContent
            form={form}
            attempted={attempted}
            setAttempted={setAttempted}
            step={dialogStep}
            setStep={setDialogStep}
            existingSkus={existingSkus}
            onSave={handleSave}
          />
        </Dialog>
      </div>
      <TableDemo products={productList} />
      <Toaster />
    </div>
  );
}

export default App;
