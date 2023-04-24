import { FormEvent, useEffect, useRef, useState } from "react";
import { UISchema } from "./types";
import Form from "./Form";
import { JsonInput } from "@mantine/core";
import { toast } from "react-hot-toast";

function App() {
  const [pizzaSchema, setPizzaSchema] = useState<UISchema[]>([]);
  const [pastaSchema, setPastaSchema] = useState<UISchema[]>([]);

  const [mainData, setMainData] = useState<UISchema[]>([]);
  const [jsonString, setJsonString] = useState<string>("");
  const ref = useRef<HTMLTextAreaElement>(null);
  // const [formData, setFormData] = useState([{}]);
  const form = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    try {
      const [pizzaRes, pastaRes] = await Promise.all([
        fetch("/pizza.json"),
        fetch("/pasta.json"),
      ]);
      const pizzaData = await pizzaRes.json();
      const pastaData = await pastaRes.json();

      setPizzaSchema(pizzaData);
      setPastaSchema(pastaData);
    } catch (error) {
      throw Error("fetching failed");
    }
  };

  // console.log(jsonString);
  // console.log(mainData);

  // console.log(formData);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(form.current as any);
    toast.success("Form data collected, check console");
    console.log(formData);
  };

  return (
    <main className="flex flex-col gap-3 lg:grid-cols-3 lg:grid">
      <section className="mx-5 mt-4">
        <h1 className="text-gray-900">Paste your schema</h1>
        <span>
          or choose a template{" "}
          <span
            className="text-blue-700 underline cursor-pointer"
            onClick={() => {
              setJsonString(JSON.stringify(pizzaSchema));
              setMainData(pizzaSchema);
            }}
          >
            Pizza
          </span>{" "}
          <span
            className="text-blue-700 underline cursor-pointer"
            onClick={() => {
              setJsonString(JSON.stringify(pastaSchema));
              setMainData(pastaSchema);
            }}
          >
            Pasta
          </span>{" "}
        </span>
        <JsonInput
          ref={ref}
          className=""
          label="UI Schema"
          value={jsonString}
          onChange={(val: string) => setJsonString(val)}
          validationError="Invalid JSON"
          formatOnBlur
          size="lg"
          withAsterisk
        />
        <button
          onClick={() => setMainData(JSON.parse(ref.current?.value as string))}
          className="px-6 py-2 mt-2 text-white bg-blue-700 rounded-md"
        >
          Generate
        </button>
      </section>
      <section className="h-screen col-span-2 bg-gray-800">
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="max-w-[40rem] mt-5 bg-white rounded-md mx-auto flex flex-col gap-2 px-5 py-4"
        >
          <Form data={mainData.length > 0 ? mainData : pizzaSchema} />
          <button
            className="px-6 py-2 text-white bg-blue-700 rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;
