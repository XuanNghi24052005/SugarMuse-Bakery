import Notification from "../models/notificationModel.js";
import ErrorHandler from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";

// Get logged-in user's notifications (or admin store notifications)
export const getMyNotifications = handleAsyncError(async (req, res, next) => {
  const userId = req.user?._id || req.user?.id;
  const isAdmin = req.admin || req.user?.role === "admin";

  let query = { user: userId };
  if (isAdmin) {
    // Admin sees their own notifications, plus all order/system alerts
    query = {
      $or: [
        { user: userId },
        { type: "order" },
        { type: "system" }
      ]
    };
  }

  let notifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .limit(30);

  // If Admin has no notifications at all, create an initial store alert
  if (isAdmin && notifications.length === 0) {
    try {
      const welcome = await Notification.create({
        user: userId,
        title: "Welcome to Sugar Muse Bakery Admin",
        message: "Your customer order alerts, product reviews, and inventory notices will appear here in real-time.",
        type: "system",
        link: "/admin/orders",
        isRead: false
      });
      notifications = [welcome];
    } catch {
      // ignore
    }
  }

  res.status(200).json({
    success: true,
    notifications,
  });
});

// Mark a single notification as read
export const markNotificationAsRead = handleAsyncError(
  async (req, res, next) => {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return next(new ErrorHandler("Notification not found", 404));
    }

    const userId = (req.user?._id || req.user?.id || "").toString();
    const isAdmin = req.admin || req.user?.role === "admin";

    if (!isAdmin && notification.user?.toString() !== userId) {
      return next(new ErrorHandler("Not authorized", 403));
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({
      success: true,
      notification,
    });
  }
);

// Mark all notifications as read
export const markAllNotificationsAsRead = handleAsyncError(async (req, res, next) => {
  const userId = req.user?._id || req.user?.id;
  const isAdmin = req.admin || req.user?.role === "admin";

  if (isAdmin) {
    await Notification.updateMany({ isRead: false }, { isRead: true });
  } else {
    await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
  }

  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
  });
});

// Delete a notification
export const deleteNotification = handleAsyncError(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return next(new ErrorHandler("Notification not found", 404));
  }

  const userId = (req.user?._id || req.user?.id || "").toString();
  const isAdmin = req.admin || req.user?.role === "admin";

  if (!isAdmin && notification.user?.toString() !== userId) {
    return next(new ErrorHandler("Not authorized", 403));
  }

  await Notification.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Notification deleted successfully",
  });
});

// Helper 
export const createNotification = async ({
  userId,
  title,
  message,
  type = "system",
  link = "",
}) => {
  try {
    await Notification.create({ user: userId, title, message, type, link });
  } catch (err) {
    console.error("Failed to create notification:", err.message);
  }
};
