package com.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JsonUtility {

	private final Gson gson;

	public JsonUtility() {
		gson = new GsonBuilder().create();
	}

	@SuppressWarnings("unchecked")
	public Map<String, String> getJson(String json) {
		return (HashMap<String, String>) gson.fromJson(json, HashMap.class);
	}

	public String convertTOJsonArray(List<Object> objects) {
		JsonArray jarray = gson.toJsonTree(objects).getAsJsonArray();
		return jarray.getAsString();
	}

	public String convertStringsTOJsonArray(List<String> properties) {
		JsonArray jarray = gson.toJsonTree(properties).getAsJsonArray();
		return jarray.getAsString();
	}

	public String convertToJson(String key, List<Object> objects) {
		JsonArray jarray = gson.toJsonTree(objects).getAsJsonArray();
		JsonObject jsonObject = new JsonObject();
		jsonObject.add(key, jarray);
		return jsonObject.toString();
	}

	public String convertToJson(String key, Object object) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.add(key, gson.toJsonTree(object));
		return jsonObject.toString();
	}

	public String convertToJson(Map<String, String> normalProperties, Map<String, Object> objects) {
		JsonObject jsonObject = new JsonObject();
		for (String key : normalProperties.keySet()) {
			jsonObject.add(key, new JsonPrimitive(normalProperties.get(key)));
		}
		for (String key : objects.keySet()) {
			jsonObject.add(key, gson.toJsonTree(objects.get(key)));
		}
		return jsonObject.toString();
	}

}
