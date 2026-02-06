import { useState } from "react";
import FormInput from "../../../../components/admin/FormInput";

const CreateNews = () => {
  const [type, setType] = useState("news");
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "",
    status: "Published",
    image: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${type === "news" ? "News" : "Event"} created (mock)`);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">CMS • News & Events</p>
        <h1 className="text-2xl font-semibold text-gray-900">
          Create {type === "news" ? "news post" : "event"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl shadow-sm p-6 space-y-4"
      >
        {/* Type Selector */}
        <label className="text-sm text-gray-700 space-y-1">
          Content Type
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="news">News</option>
            <option value="event">Event</option>
          </select>
        </label>

        <FormInput
          label="Title"
          value={form.title}
          onChange={(v) => handleChange("title", v)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Category"
            value={form.category}
            onChange={(v) => handleChange("category", v)}
            placeholder={
              type === "news"
                ? "e.g., Academic, Research"
                : "e.g., Sports, Seminar"
            }
            required
          />
          <label className="text-sm text-gray-700 space-y-1">
            Status
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option>Published</option>
              <option>Draft</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Date"
            type="date"
            value={form.date}
            onChange={(v) => handleChange("date", v)}
            required
          />
          {type === "event" && (
            <FormInput
              label="Time"
              type="time"
              value={form.time}
              onChange={(v) => handleChange("time", v)}
            />
          )}
        </div>

        {type === "event" && (
          <FormInput
            label="Location"
            value={form.location}
            onChange={(v) => handleChange("location", v)}
            placeholder="Event venue or 'Virtual'"
            required
          />
        )}

        <label className="text-sm text-gray-700 space-y-1 block">
          Description
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            placeholder={
              type === "news"
                ? "Details of the news post..."
                : "Details and description of the event..."
            }
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </label>

        <label className="text-sm text-gray-700 space-y-1 block">
          Image upload
          <input
            type="file"
            onChange={(e) =>
              handleChange("image", e.target.files?.[0]?.name || "")
            }
            className="w-full rounded-lg border-gray-300 text-sm shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {form.image && (
            <span className="text-xs text-gray-500">
              Selected: {form.image}
            </span>
          )}
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNews;
