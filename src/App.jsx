import MyModelViewer from "./component/MyModelViewer";
import { useState } from "react";
import "./App.css"
const presets_background = [
  "city",
  "forest",
  "night",
  "sunset",
  "warehouse",
  "apartment",
  "park",
  "lobby",
];

const model_presets_list = [
  { name: "Robot Helper", url: "/models/robot_police_little_helper.glb" },
  { name: "Big Sword", url: "/models/stylized_big_sword.glb" },
  { name: "Knight Armor", url: "/models/the_parade_armour_of_king_erik_xiv_of_sweden.glb" },
];

const fileInputStyle = { display: "none" };

function App() {
  const [currentPreset, setCurrentPreset] = useState("sunset");
  const [modelUrl, setModelUrl] = useState(model_presets_list[0].url);
  const [objectUrl, setObjectUrl] = useState(null);
  const [activeModelPresetUrl, setActiveModelPresetUrl] = useState(model_presets_list[0].url);

  const handlePresetChange = (preset) => setCurrentPreset(preset);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      const newObjectUrl = URL.createObjectURL(file);
      setObjectUrl(newObjectUrl);
      setModelUrl(newObjectUrl);
      setActiveModelPresetUrl(null);
    }
  };

  const handleModelPresetChange = (presetModel) => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    setModelUrl(presetModel.url);
    setActiveModelPresetUrl(presetModel.url);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-6">
       {/* Model Viewer Area */}
      <div className="w-full max-w-4xl h-[500px] bg-white rounded-md shadow-lg flex items-center justify-center">
        <MyModelViewer currentPreset={currentPreset} modelUrl={modelUrl} />
      </div>

      
      {/* Control Panel */}
      <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-md">
        {/* Background Presets */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-center mb-4">เลือกพื้นหลัง (Background)</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {presets_background.map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetChange(preset)}
                className={`px-4 py-2 w-32 text-sm transition ${
                  currentPreset === preset
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {preset.charAt(0).toUpperCase() + preset.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Model Presets */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-center mb-4">เลือกโมเดลจาก Preset</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {model_presets_list.map((modelPreset) => (
              <button
                key={modelPreset.name}
                onClick={() => handleModelPresetChange(modelPreset)}
                className={`px-4 py-2 w-32 text-sm transition ${
                  activeModelPresetUrl === modelPreset.url
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {modelPreset.name}
              </button>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold mb-2">ทดสอบโมเดลของคุณ</h3>
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-block bg-blue-100 text-blue-700 hover:bg-blue-200 px-6 py-2 text-sm"
          >
            อัปโหลดไฟล์ (.glb, .gltf)
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".glb,.gltf"
            onChange={handleFileChange}
            style={fileInputStyle}
          />
        </div>
      </div>

      
    </div>
    {/* Footer Description */}
      <footer className="w-fullmt-8 text-center text-gray-600 text-sm bg-gray-100 pt-4">
        <h4 className="text-lg font-semibold mb-2">เว็บไซต์นี้ทำอะไรได้บ้าง?</h4>
        <p>
          เว็บแอปพลิเคชันนี้ช่วยให้คุณสามารถแสดงผลโมเดล 3 มิติ (.glb, .gltf) ได้อย่างง่ายดาย คุณสามารถ:
        </p>
        <ul className="list-disc list-inside inline-block text-left mt-2">
          <li>เลือกพื้นหลังจากรายการที่กำหนดไว้ล่วงหน้า (Presets)</li>
          <li>เลือกโมเดล 3 มิติจากรายการตัวอย่าง (Model Presets)</li>
          <li>อัปโหลดไฟล์โมเดล 3 มิติของคุณเองเพื่อแสดงผล</li>
          <li>ควบคุมมุมมองของโมเดลด้วยการลากเมาส์ (Orbit Controls) และซูมเข้า/ออก</li>
          <li>สลับโหมดการแสดงผลแบบเต็มหน้าจอ (Fullscreen)</li>
        </ul>
        <h3 className="text-lg font-semibold mt-4 bg-slate-200 p-2">CopyRight © {new Date().getFullYear()} create by <a href="https://github.com/JessadaID" className="text-blue-500 hover:underline">JessadaID</a></h3>
      </footer>
    </>
  );
}

export default App;
