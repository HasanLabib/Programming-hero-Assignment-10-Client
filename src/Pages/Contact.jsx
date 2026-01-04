import React, { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://programming-hero-assignment-10-serv.vercel.app/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully ❤️");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-16">
      <div className="w-11/12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Get in touch with
            <span className="text-orange-500"> Local Food Lovers</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Have a suggestion, feedback, or partnership idea? We’d love to hear
            from you. Let’s celebrate local food together 🍲
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              📍 <span>Bangladesh • Supporting Local Communities</span>
            </div>
            <div className="flex items-center gap-3">
              📧 <span>support@localfoodlovers.com</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <textarea
              name="message"
              placeholder="Your message"
              required
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
            />

            <button
              disabled={loading}
              className="btn btn-primary w-full rounded-full"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
