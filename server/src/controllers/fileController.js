const cloudinary = require('../config/cloudinaryConfig');

const uploadFile = async (req, res) => {
  try {
        if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
        }

        res.json({
        message: "File uploaded successfully",
        url: req.file.path, // Cloudinary URL
        public_id: req.file.filename, // Cloudinary Public ID
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeFile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    // Extract the id from public_id
    // const id = public_id.split('/').pop();
    console.log('DELETE request received:', id);

    await cloudinary.uploader.destroy(`uploads/${id}`);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getFiles = async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression('folder:uploads')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

    const files = resources.map((file) => ({
      id: file.public_id,
      name: file.filename,
      date: new Date(file.created_at).toLocaleDateString('en-GB'), // Format: dd/mm/yyyy
      type: file.format.toUpperCase(),
      size: `${(file.bytes / (1024 * 1024)).toFixed(2)}MB`,
      url: file.secure_url,
    }));

    res.status(200).json({
      message: 'Files retrieved successfully',
      files
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { uploadFile, removeFile, getFiles };