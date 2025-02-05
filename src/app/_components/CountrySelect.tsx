"use client";
import { useEffect, useState } from "react";

interface Country {
  code: string;
  name: string;
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
          code: country.cca2,
          name: country.name.common,
        }));
        setCountries(
          countryList.sort((a: Country, b: Country) =>
            a.name.localeCompare(b.name)
          )
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  return (
    <div>
      <label className="block font-medium">Select country</label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className={`w-full p-2 mt-1 border rounded-md ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="">Select</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm">Select country to continue</p>
      )}
    </div>
  );
}
