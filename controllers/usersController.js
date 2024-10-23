import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../modals/User.js';

const token = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    )
}

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await user.save();

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            token: token(user)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        return res.status(200).json({
            message: 'Logged in successfully',
            token: token(user)

        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export { registerUser, loginUser };
