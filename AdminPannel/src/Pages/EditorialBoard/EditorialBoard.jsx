import React, { useState, useEffect } from 'react';
import API, { BASE_URL } from "../../api/axios";
import './EditorialBoard.css';

const EditorialBoard = () => {
  // Form State Values
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [institution, setInstitution] = useState('');
  const [category, setCategory] = useState('Editorial Board');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [biography, setBiography] = useState('');
  
  // Storage for actual File object to be sent to backend
  const [selectedFile, setSelectedFile] = useState(null);
  // Image Preview State (Local URL string or backend hosted path string)
  const [profileImage, setProfileImage] = useState(null);
  
  // Tag System State Values
  const [tags, setTags] = useState(['Researcher', 'Global Board', 'Reviewer', 'AI', 'IEEE']);
  const [tagInput, setTagInput] = useState('');

  // Primary Workspace Engine Array State
  const [boardMembers, setBoardMembers] = useState([]);
  
  // Application Loading / UI feedback tracking states
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch all board members on component mount
  useEffect(() => {
    fetchBoardMembers();
  }, []);

  // Fetch data pipeline from Express server using custom API engine
  const fetchBoardMembers = async () => {
    try {
      setLoading(true);
      const response = await API.get("/editorialboard/all");
      
      // Normalize incoming data safely
      let dataArray = [];
      if (Array.isArray(response.data)) {
        dataArray = response.data;
      } else if (response.data && Array.isArray(response.data.members)) {
        dataArray = response.data.members;
      } else if (response.data && typeof response.data === 'object') {
        dataArray = response.data.data || [];
      }

      setBoardMembers(dataArray);
    } catch (error) {
      console.error("Error retrieving dataset records:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper helper to handle relative server asset paths cleanly
  const resolveImageSource = (imagePath) => {
    if (!imagePath) return null;
    // If it's already an absolute web address or an open local stream blob
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    // Clean trailing slashes from BASE_URL and leading slashes from image path
    const cleanBase = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${cleanBase}/${cleanPath}`;
  };

  // Handle Local System Blob Parsing & Identity Mapping
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Free memory allocation pointer if changing existing unsaved blob previews
      if (profileImage && profileImage.startsWith('blob:')) {
        URL.revokeObjectURL(profileImage);
      }
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Chips Array Keypress Monitor
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  // Reset/Flush Input Node Registry Buffer
  const resetFormFields = () => {
    setName('');
    setDesignation('');
    setInstitution('');
    setCategory('Editorial Board');
    setEmail('');
    setPhone('');
    setBiography('');
    setSelectedFile(null);
    setProfileImage(null);
    setTags(['Researcher', 'Global Board', 'Reviewer', 'AI', 'IEEE']);
    setEditingId(null);
  };

  // Core Submit Route Router Execution Module (Create / Update via custom API tool)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !designation.trim() || !institution.trim()) {
      alert("Please enter all mandatory fields.");
      return;
    }

    // Prepare multi-part structural form instance block
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("designation", designation.trim());
    formData.append("institution", institution.trim());
    formData.append("category", category);
    formData.append("email", email.trim());
    formData.append("phone", phone.trim());
    formData.append("biography", biography.trim());
    
    // Always append tags structured array safely
    formData.append("tags", JSON.stringify(tags));

    // Append File system node if a new local choice exists
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }

    try {
      setLoading(true);
      if (editingId !== null) {
        // Route execution over updating parameters: PUT /editorialboard/update/:id
        await API.put(`/editorialboard/update/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Member registry parameters successfully updated.");
      } else {
        // Route execution over creation parameters: POST /editorialboard/create
        await API.post("/editorialboard/create", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Member profile processed and saved safely into system registry.");
      }
      
      resetFormFields();
      await fetchBoardMembers(); // Instantly run network fetch to pull database state changes down to your UI table
    } catch (error) {
      console.error("Form transmission failed error:", error);
      alert(error.response?.data?.message || "Internal transmission network block failure.");
    } finally {
      setLoading(false);
    }
  };

  // Mount targeted object properties backward into fields framework
  const initializeEditSequence = (member) => {
    setEditingId(member._id || member.id); 
    setName(member.name || '');
    setDesignation(member.designation || '');
    setInstitution(member.institution || '');
    setCategory(member.category || 'Editorial Board');
    setEmail(member.email || '');
    setPhone(member.phone || '');
    setBiography(member.biography || '');
    
    // Safety check parsing mixed schema types for tags array
    if (Array.isArray(member.tags)) {
      setTags(member.tags);
    } else if (typeof member.tags === 'string') {
      try {
        setTags(JSON.parse(member.tags));
      } catch {
        setTags([]);
      }
    } else {
      setTags([]);
    }
    
    // Maintain raw image path string reference for structural updates
    const rawImage = member.profileImage || member.image || null;
    setProfileImage(rawImage);
    setSelectedFile(null); 

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Splice target object out of backend records
  const executeDestructionSequence = async (id) => {
    if (window.confirm("Confirm structural deletion of this record?")) {
      try {
        setLoading(true);
        await API.delete(`/editorialboard/delete/${id}`);
        alert("Registry data node successfully purged.");
        
        if (editingId === id) {
          resetFormFields();
        }
        await fetchBoardMembers();
      } catch (error) {
        console.error("Error executing component deletion route:", error);
        alert("Failed to remove data element tracking instance.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="eb-container">
      <h2 className="eb-main-title">Editorial Board Management</h2>
      
      {/* FORM SECTION */}
      <form className="eb-form-card" onSubmit={handleFormSubmit}>
        <div className="eb-card-header-row">
          <h3 className="eb-card-sub-title">
            {editingId ? '⚡ Configuration Interface: Update Row Instance' : '✦ Configuration Interface: Append New Instance'}
          </h3>
          {editingId && (
            <button type="button" className="eb-btn-abort" onClick={resetFormFields}>
              Cancel Configuration
            </button>
          )}
        </div>

        <div className="eb-form-grid">
          
          {/* Left Column: Image Upload & Preview */}
          <div className="eb-form-group eb-col-full md-eb-col-6">
            <label className="eb-label">Upload Profile Image</label>
            <div className="eb-upload-box">
              <input 
                type="file" 
                id="profileUpload" 
                accept=".jpg,.jpeg,.png,.webp" 
                onChange={handleImageChange}
                className="eb-file-input"
              />
              <label htmlFor="profileUpload" className="eb-upload-label">
                {profileImage ? (
                  <img 
                    src={resolveImageSource(profileImage)} 
                    alt="Preview" 
                    className="eb-image-preview" 
                    onError={(e) => {
                      // Fallback alternative text avatar representation if link is broken
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = '<div className="eb-upload-placeholder"><span className="eb-upload-icon">👤</span><p>Image Error</p></div>';
                    }}
                  />
                ) : (
                  <div className="eb-upload-placeholder">
                    <span className="eb-upload-icon">✦</span>
                    <p>Drag & Drop Here</p>
                    <span>OR</span>
                    <button type="button" className="eb-upload-btn">Choose Image</button>
                  </div>
                )}
              </label>
            </div>
            <p className="eb-help-text">Supported: JPG, PNG, WEBP</p>
          </div>

          {/* Right Column: Name & Details */}
          <div className="eb-form-group eb-col-full md-eb-col-6">
            <div className="eb-sub-group">
              <label className="eb-label">Editor Name <span className="eb-required">*</span></label>
              <input 
                type="text" 
                className="eb-input" 
                placeholder="e.g. Dr. Swarupananda Mukherjee" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            
            <div className="eb-sub-group">
              <label className="eb-label">Designation <span className="eb-required">*</span></label>
              <input 
                type="text" 
                className="eb-input" 
                placeholder="e.g. Associate Professor" 
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required 
              />
            </div>
          </div>

          {/* Institution & Category */}
          <div className="eb-form-group eb-col-full md-eb-col-6">
            <label className="eb-label">Institution <span className="eb-required">*</span></label>
            <input 
              type="text" 
              className="eb-input" 
              placeholder="e.g. NSHM Knowledge Campus, Kolkata, India" 
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required 
            />
          </div>

          <div className="eb-form-group eb-col-full md-eb-col-6">
            <label className="eb-label">Select Category</label>
            <select 
              className="eb-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Patron & Management">▼ Patron & Management</option>
              <option value="Editor-in-Chief">▼ Editor-in-Chief</option>
              <option value="International Editorial Advisory Board">▼ International Editorial Advisory Board</option>
              <option value="Editorial Board">▼ Editorial Board</option>
            </select>
            <p className="eb-help-text">Decides where the profile appears on the website.</p>
          </div>

          {/* Key Tags (Chips Input) */}
          <div className="eb-form-group eb-col-full">
            <label className="eb-label">Key Tags</label>
            <div className="eb-chips-wrapper">
              {tags.map((tag, index) => (
                <span key={index} className="eb-chip">
                  {tag}
                  <button type="button" className="eb-chip-remove" onClick={() => removeTag(index)}>&times;</button>
                </span>
              ))}
              <input 
                type="text" 
                className="eb-chip-input" 
                placeholder="Press Enter to add tags" 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="eb-form-group eb-col-full md-eb-col-6">
            <label className="eb-label">Email</label>
            <input 
              type="email" 
              className="eb-input" 
              placeholder="editor@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="eb-form-group eb-col-full md-eb-col-6">
            <label className="eb-label">Phone</label>
            <input 
              type="tel" 
              className="eb-input" 
              placeholder="+1 234 567 890" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Biography */}
          <div className="eb-form-group eb-col-full">
            <label className="eb-label">Biography</label>
            <textarea 
              className="eb-textarea" 
              rows="4" 
              placeholder="Write a brief biography..."
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
            ></textarea>
          </div>

        </div>

        {/* Save/Update Action Button */}
        <div className="eb-form-actions">
          <button type="submit" disabled={loading} className={`eb-btn-primary ${editingId ? 'eb-btn-state-updating' : ''}`}>
            {loading ? 'Processing...' : editingId ? '⚡ Update Registry Node' : 'Save Profile'}
          </button>
        </div>
      </form>

      {/* LIST TABLE SECTION */}
      <div className="eb-table-card">
        <h3 className="eb-table-title">Registered Board Members</h3>
        <div className="eb-table-responsive">
          <table className="eb-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name & Designation</th>
                <th>Institution</th>
                <th>Category</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {boardMembers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="eb-empty-feedback">
                    No records found in active registry dataset.
                  </td>
                </tr>
              ) : (
                boardMembers.map((member) => {
                  const currentId = member._id || member.id;
                  const rawImage = member.profileImage || member.image;
                  const computedImageSrc = resolveImageSource(rawImage);
                  
                  return (
                    <tr key={currentId} className={editingId === currentId ? 'eb-row-active-edit' : ''}>
                      <td>
                        <div className="eb-table-avatar">
                          {computedImageSrc ? (
                            <img 
                              src={computedImageSrc} 
                              alt={`${member.name || 'Member'}'s Avatar`} 
                              onError={(e) => { 
                                // Gracefully swap broken images with default fallback layout text placeholder
                                e.target.style.display = 'none'; 
                                e.target.parentNode.innerText = '👤'; 
                              }} 
                            />
                          ) : (
                            '👤'
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="eb-table-name">{member.name}</div>
                        <div className="eb-table-subtext">{member.designation}</div>
                      </td>
                      <td><div className="eb-table-inst-cell">{member.institution}</div></td>
                      <td><span className="eb-table-badge">{member.category}</span></td>
                      <td>
                        <div className="eb-table-contact-cell">
                          <div>{member.email || <span className="eb-none">--</span>}</div>
                          <div className="eb-table-subtext">{member.phone || '--'}</div>
                        </div>
                      </td>
                      <td>
                        <div className="eb-table-actions">
                          <button 
                            type="button"
                            className="eb-btn-text-edit" 
                            onClick={() => initializeEditSequence(member)}
                          >
                            Edit
                          </button>
                          <button 
                            type="button"
                            className="eb-btn-text-delete" 
                            onClick={() => executeDestructionSequence(currentId)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditorialBoard;