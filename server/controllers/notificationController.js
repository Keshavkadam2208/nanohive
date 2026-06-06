import Notification from "../models/Notification.js";

export const getMyNotifications = async(req, res) =>{
    try {
        const notifications = await Notification.find({
            recipient:req.user._id
        }).sort({
            createdAt:-1
        });
        res.status(200).json({
            count:notifications.length,
            notifications
        });
    } catch (error) {
        res.status(200).josn({
            message:error.message
        });
    }
};

export const markAsRead = async(req, res) =>{
    try {
        const notification = await Notification.findById(
            req.params.id
        );

        if(!notification)
        {
            return res.status(404).json({
                message:"Notification not found"
            });
        }
        if(notification.recipient.toString() !== req.user._id.toString())
        {
            return res.status(403).json({
                message:"Access Denied"
            })
        }
        notification.isRead = true;
        await notification.save();
        res.status(200).json({
            message:"Notification marked as read"
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}