/* eslint-disable react/prop-types */
const Select = ({ onChange, options, placeholder, name }) => {
  return (
    <select
      name={name}
      id={name}
      className="px-3 py-2 mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
      onChange={(e) => onChange(e.target.value)}
    >
      <option hidden>{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Select
