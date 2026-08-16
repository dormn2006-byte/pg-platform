import api from "../../services/api";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  ImagePlus,
  MapPin,
  Wifi,
  Snowflake,
  ShieldCheck,
  Utensils,
  IndianRupee,
  Save,
  Plus,
  X,
  Sparkles,
} from "lucide-react";

const defaultAmenitiesList = [
  "WiFi",
  "AC Rooms",
  "Food Included",
  "Laundry",
  "Parking",
  "CCTV Security",
  "Power Backup",
  "Attached Bathroom",
  "Housekeeping",
  "RO Water",
];

const AddPG = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // Navigation hook for redirecting

  const [formData, setFormData] = useState({
    title: "",
    owner_name: "",
    mobile: "",
    price: "",
    description: "",
    address: "",
    google_map_link: "",
    nearby_college: "",
    pg_type: "boys",
    city: "",
    area: "",
    available_rooms: "",
    rules: "",
  });

  // Dynamic Structure for Room Sharing Variants & Pricing Options
  const [sharingOptions, setSharingOptions] = useState({
    single: { available: false, ac_price: "", non_ac_price: "" },
    double: { available: false, ac_price: "", non_ac_price: "" },
    triple: { available: false, ac_price: "", non_ac_price: "" },
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  
  // Custom Amenities Modal & State
  const [customAmenities, setCustomAmenities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAmenityInput, setNewAmenityInput] = useState("");
  
  const [loading, setLoading] = useState(false);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleAddCustomAmenity = (e) => {
    e.preventDefault();
    const trimmed = newAmenityInput.trim();
    if (!trimmed) return;

    // Add to custom list if not already present
    if (!defaultAmenitiesList.includes(trimmed) && !customAmenities.includes(trimmed)) {
      setCustomAmenities((prev) => [...prev, trimmed]);
    }

    // Auto-select the newly added custom amenity
    if (!selectedAmenities.includes(trimmed)) {
      setSelectedAmenities((prev) => [...prev, trimmed]);
    }

    setNewAmenityInput("");
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSharingCheckboxChange = (roomType) => {
    setSharingOptions((prev) => ({
      ...prev,
      [roomType]: {
        ...prev[roomType],
        available: !prev[roomType].available,
      },
    }));
  };

  const handleSharingPriceChange = (roomType, field, value) => {
    setSharingOptions((prev) => ({
      ...prev,
      [roomType]: {
        ...prev[roomType],
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }

    setSelectedImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      const data = new FormData();
  
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("pg_type", formData.pg_type);
      data.append("price", formData.price);
      data.append("address", formData.address);
      data.append("google_map_link", formData.google_map_link);
      data.append("city", formData.city);
      data.append("area", formData.area);
      data.append("nearby_college", formData.nearby_college);
      data.append("available_rooms", formData.available_rooms);
      data.append("rules", formData.rules);
  
      data.append("amenities", JSON.stringify(selectedAmenities));
      data.append("sharing_options", JSON.stringify(sharingOptions));
  
      if (selectedImages.length > 0) {
        selectedImages.forEach((image) => {
          data.append("images", image);
        });
      }
  
      console.log("Submitting PG...");
  
      const response = await api.post(
        "/pg/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("PG Created Successfully:", response.data);
      alert("PG submitted successfully and sent for approval.");

      // REDIRECT TO MY PGS
      navigate("/owner/my-pgs");

    } catch (error) {
      console.error("PG Submit Error:", error?.response?.data || error);
      alert(error?.response?.data?.message || "Failed to submit PG");
    } finally {
      setLoading(false);
    }
  };

  const allAmenities = [...defaultAmenitiesList, ...customAmenities];

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Form */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Side */}
          <div className="space-y-6">
            {/* Basic Details */}
            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-black">
                Basic Information
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    PG Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter PG name"
                    required
                    className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter owner name"
                    className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    name="owner_name"
                    value={formData.owner_name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter contact number"
                    className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Monthly Starting Price
                  </label>
                  <div className="relative">
                    <IndianRupee
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <input
                      type="number"
                      placeholder="7999"
                      required
                      className="w-full rounded-2xl border border-gray-300 bg-white py-4 pl-11 pr-5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  rows="5"
                  placeholder="Describe your PG, rooms, food, security and nearby facilities"
                  required
                  className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Room Sharing Matrix UI Section */}
            <div className="rounded-[2rem] border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                Room Sharing & Pricing Configurations
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Enable options to customize custom monthly models for AC/Non-AC layouts.
              </p>
              
              <div className="mt-6 space-y-4 sm:space-y-6">
                {Object.keys(sharingOptions).map((roomType) => (
                  <div key={roomType} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-5 transition-all">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sharingOptions[roomType].available}
                          onChange={() => handleSharingCheckboxChange(roomType)}
                          className="h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                        />
                        <span className="text-sm sm:text-base font-bold capitalize text-gray-900 select-none">
                          {roomType} Sharing Room
                        </span>
                      </label>
                    </div>

                    {sharingOptions[roomType].available && (
                      <div className="mt-5 grid gap-4 sm:grid-cols-2 animate-fadeIn">
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-gray-600">AC Price / Month</label>
                          <div className="relative">
                            <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                              type="number"
                              placeholder="Price with AC"
                              className="w-full rounded-xl border border-gray-300 bg-white py-3 sm:py-3.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                              value={sharingOptions[roomType].ac_price || ""}
                              onChange={(e) => handleSharingPriceChange(roomType, "ac_price", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-gray-600">Non-AC Price / Month</label>
                          <div className="relative">
                            <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                              type="number"
                              placeholder="Price without AC"
                              className="w-full rounded-xl border border-gray-300 bg-white py-3 sm:py-3.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                              value={sharingOptions[roomType].non_ac_price || ""}
                              onChange={(e) => handleSharingPriceChange(roomType, "non_ac_price", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                PG Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, pg_type: "boys" })}
                  className={`rounded-2xl border p-5 transition ${
                    formData.pg_type === "boys"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                >
                  👦
                  <div className="mt-2 font-bold">Boys PG</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, pg_type: "girls" })}
                  className={`rounded-2xl border p-5 transition ${
                    formData.pg_type === "girls"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                >
                  👧
                  <div className="mt-2 font-bold">Girls PG</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, pg_type: "coed" })}
                  className={`rounded-2xl border p-5 transition ${
                    formData.pg_type === "coed"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                >
                  🚹🚺
                  <div className="mt-2 font-bold">Boys & Girls</div>
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <MapPin className="text-cyan-600" size={24} />
                <h2 className="text-2xl font-black text-black">Location Details</h2>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Full Address</label>
                  <input
                    type="text"
                    placeholder="Sector 62, Noida"
                    required
                    className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Exact Google Maps Link</label>
                  <input
                    type="text"
                    placeholder="Paste exact Google Maps location"
                    className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    name="google_map_link"
                    value={formData.google_map_link}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Nearby Colleges / Famous Areas</label>
                  <textarea
                    rows="4"
                    placeholder="MIT Noida, Knowledge Park, Amity University, Metro Station nearby"
                    required
                    className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    name="nearby_college"
                    value={formData.nearby_college}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-emerald-600" size={24} />
                  <h2 className="text-2xl font-black text-black">Amenities</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-50 px-3.5 py-2 text-xs font-bold text-cyan-700 hover:bg-cyan-100 transition"
                >
                  <Plus size={16} />
                  Add Custom
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {allAmenities.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`rounded-2xl border px-5 py-3 text-sm font-semibold transition ${
                      selectedAmenities.includes(amenity)
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-gray-900 hover:border-black focus:ring-2 focus:ring-cyan-200"
                    }`}
                  >
                    {amenity}
                  </button>
                ))}

                {/* Additional Add Button inline */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 px-5 py-3 text-sm font-bold text-gray-600 hover:border-black hover:text-black transition"
                >
                  <Plus size={16} />
                  Add Other
                </button>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Upload Images */}
            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <ImagePlus className="text-pink-600" size={24} />
                <h2 className="text-2xl font-black text-black">Upload Photos</h2>
              </div>
              <p className="mt-2 text-sm text-gray-500">Upload up to 10 images of your PG. The first image will be used as the cover image.</p>

              <div className="mt-6 rounded-[2rem] border-2 border-dashed border-gray-300 bg-gray-50 p-10 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">
                  <Upload size={30} />
                </div>

                <h3 className="mt-5 text-xl font-black text-black">Upload PG Images</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Add room photos, washroom photos, building front view and common areas.
                </p>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="mt-6 rounded-2xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Choose Files
                </button>

                {selectedImages.length > 0 && (
                  <div className="mt-5 space-y-2 text-left">
                    {selectedImages.map((image, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
                      >
                        {image.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Preview Features */}
            <div className="rounded-[2rem] border border-gray-200 bg-gradient-to-br from-black to-gray-900 p-6 text-white shadow-sm">
              <h2 className="text-2xl font-black">Your PG Highlights</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Wifi className="text-cyan-400" size={22} />
                  <p className="font-medium">High-Speed WiFi Included</p>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Snowflake className="text-cyan-400" size={22} />
                  <p className="font-medium">AC & Non-AC Rooms Available</p>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Utensils className="text-cyan-400" size={22} />
                  <p className="font-medium">Daily Food Service Included</p>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-gray-300 bg-white p-4 mt-6">
                <p className="mb-2 text-sm text-gray-400">Complete these details before submitting your PG.</p>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none"
                />

                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Area"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none"
                />

                <input
                  type="number"
                  name="available_rooms"
                  value={formData.available_rooms}
                  onChange={handleChange}
                  placeholder="Available Rooms"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none"
                />

                <textarea
                  rows="3"
                  name="rules"
                  value={formData.rules}
                  onChange={handleChange}
                  placeholder="PG Rules"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full rounded-2xl bg-white py-4 text-sm font-black text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Submitting PG..." : "Submit PG For Approval"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Custom Amenity Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="text-amber-500" size={20} />
                <h3 className="text-xl font-black text-gray-900">Add Custom Amenity</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-2 text-xs font-medium text-gray-500">
              Add any facility or service unique to your PG (e.g., "Gaming Zone", "South Indian Meals", "Gym Access").
            </p>

            <form onSubmit={handleAddCustomAmenity} className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Amenity Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Special Meals, Lift Facility"
                  value={newAmenityInput}
                  onChange={(e) => setNewAmenityInput(e.target.value)}
                  autoFocus
                  required
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-black px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-gray-800"
                >
                  Add Amenity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPG;