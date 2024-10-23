import Media from '../modals/Media.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Upload Media
export const uploadMedia = async (req, res) => {
    try {
        const { tags } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newMedia = new Media({
            _id: uuidv4(), 
            name: file.originalname, 
            type: file.mimetype,
            url: `/uploads/${file.filename}`, 
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            uploadDate: new Date(),
        });

        await newMedia.save();

        res.status(201).json({
            message: 'File uploaded successfully',
            media: newMedia,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Media
export const getAllMedia = async (req, res) => {
    try {
        const mediaList = await Media.find();
        res.status(200).json(mediaList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Media
export const deleteMedia = async (req, res) => {
    try {
        const mediaId = req.params.id;
        const media = await Media.findById(mediaId);

        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }

        const filePath = path.join(process.cwd(), media.url); // Use process.cwd() for the correct path

        fs.unlink(filePath, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to delete file from server' });
            }

            await media.deleteOne();
            res.status(200).json({ message: 'Media deleted successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Share Media
export const shareMedia = async (req, res) => {
    try {
        const mediaId = req.params.id;
        const media = await Media.findById(mediaId);

        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }

        media.shareId = uuidv4();
        media.shares += 1;  

        await media.save();

        res.status(200).json({
            message: 'Media shared successfully',
            shareId: media.shareId,
            shareLink: `https://herogram.vercel.app/media/share/${media.shareId}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getSharedMedia = async (req, res) => {
    try {
        const { shareId } = req.params; 
        const media = await Media.findOne({ shareId }); 

        if (!media) {
            return res.status(200).json({ message: 'Media not found' });
        }

        media.views += 1; 
        await media.save(); 

        res.status(200).json(media);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
