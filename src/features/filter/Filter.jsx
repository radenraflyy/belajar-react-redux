import { useEffect } from "react"
import Select from "../../components/Select"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories, selectorCategory, setAbjad, setCategory, setUrutkan } from "./filterSlice"

const Filter = () => {
  const dispacth = useDispatch()

  // useDispatch Redux Start
  const optionsCategory = useSelector(selectorCategory)
  // useDispatch Redux End
  const optionsAbjad = ["ASC", "DESC"]
  const optionsUrutkan = ["Harga Termurah", "Harga Termahal"]

  const onChange = (selectedOption, name) => {
    if (name === "category") {
      dispacth(setCategory(selectedOption))
    } else if (name === "abjad") {
      dispacth(setAbjad(selectedOption))
    } else if (name === "urutkan") {
      dispacth(setUrutkan(selectedOption))
    }
  }

  useEffect(() => {
    dispacth(fetchCategories())
  }, [dispacth])

  return (
    <>
      <div className="border bg-slate-500 mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full p-5">
          <div className="flex flex-col">
            <label className="text-white">Category</label>
            <Select
              onChange={(selectedOption) => onChange(selectedOption, "category")}
              options={optionsCategory}
              placeholder={"Select Category"}
              name={"category"}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Filter Abjad</label>
            <Select
              options={optionsAbjad}
              onChange={(selectedOption) => onChange(selectedOption, "abjad")}
              placeholder={"Filter Abjad"}
              name={"abjad"}
            />
          </div>
          <div>
            <label className="text-white">Urutkan</label>
            <Select
              options={optionsUrutkan}
              onChange={(selectedOption) => onChange(selectedOption, "urutkan")}
              placeholder={"Urutkan"}
              name={"urutkan"}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter
