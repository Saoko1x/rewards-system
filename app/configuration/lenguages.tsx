import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import languages from "~/assets/languages";
import { useColorScheme } from "~/lib/useColorScheme";

const LanguageList = () => {
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const filteredLanguages = languages.filter((language) =>
    language.native.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectLanguage = (language: {
    name?: string;
    code: any;
    native?: string;
  }) => {
    setSelectedLanguage(language.code);
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
        data={filteredLanguages}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`flex-row justify-between items-center py-5 px-2 border-b ${
              isDarkMode ? "border-[#242424]" : "border-[#f5f5f5]"
            }`}
            onPress={() => handleSelectLanguage(item)}
          >
            <Text
              className={`${isDarkMode ? "text-white" : "text-black"} text-lg`}
              style={{ fontFamily: "MontserratRegular" }}
            >
              {item.native} ({item.name})
            </Text>
            {selectedLanguage === item.code ? (
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

export default LanguageList;
