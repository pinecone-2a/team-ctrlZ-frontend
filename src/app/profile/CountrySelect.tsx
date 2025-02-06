"use client";
import { useEffect, useState } from "react";
import Select from "react-select";

interface Country {
  value: string;
  label: string;
}

export default function CountrySelect({
  onSelect,
  error,
}: {
  onSelect: (country: string) => void;
  error: boolean;
}) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countryList = data.map((country: any) => ({
          value: country.cca2,
          label: `${country.flag} ${country.name.common}`,
        }));
        setCountries(
          countryList.sort((a: any, b: any) => a.label.localeCompare(b.label))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-4">
      <label className="block font-medium">Select Country</label>
      {loading ? (
        <p>Loading countries...</p>
      ) : (
        <Select
          options={countries}
          onChange={(selected: any) => onSelect(selected?.value || "")}
          placeholder="Search and select a country..."
          classNamePrefix="react-select"
          styles={{
            control: (base: any) => ({
              ...base,
              borderColor: error ? "red" : base.borderColor,
              "&:hover": { borderColor: error ? "red" : base.borderColor },
            }),
          }}
        />
      )}
      {error && <p className="text-red-500 text-sm">Please select a country</p>}
    </div>
  );
}
