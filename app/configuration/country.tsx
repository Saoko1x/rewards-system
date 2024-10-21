import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import countries from "~/assets/countries";
import { useColorScheme } from "~/lib/useColorScheme";

const CountryList = () => {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCountry = (country: { name?: string; code: any }) => {
    setSelectedCountry(country.code);
  };

  return (
    <View
      className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"} px-4 pt-5`}
    >
      <View
        className={`flex-row items-center mb-5 ${
          isDarkMode ? "bg-[#232323]" : "bg-[#F9F9F9]"
        } rounded-full px-3`}
      >
        <Ionicons
          name="search"
          size={20}
          color={isDarkMode ? "#999" : "#666"}
          className="mr-2"
        />
        <TextInput
          className={`flex-1 ${isDarkMode ? "text-white" : "text-black"} h-14`}
          style={{ fontFamily: "MontserratRegular" }}
          placeholder="Search"
          placeholderTextColor={isDarkMode ? "#999" : "#666"}
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <Ionicons
          name="filter"
          size={20}
          color={isDarkMode ? "#999" : "#666"}
          className="ml-2"
        />
      </View>
      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`flex-row justify-between items-center py-5 px-2 border-b ${
              isDarkMode ? "border-[#242424]" : "border-[#f5f5f5]"
            }`}
            onPress={() => handleSelectCountry(item)}
          >
            <Text
              className={`${isDarkMode ? "text-white" : "text-black"} text-lg`}
              style={{ fontFamily: "MontserratRegular" }}
            >
              {item.name}
            </Text>
            {selectedCountry === item.code ? (
              <View className="w-6 h-6 border-2 border-blue-500 rounded-full flex items-center justify-center">
                <View className="w-3 h-3 bg-blue-500 rounded-full" />
              </View>
            ) : (
              <View className="w-6 h-6 border-2 border-gray-300 rounded-full" />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CountryList;
