function Contact() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="fw-bold">Contact Us</h1>
          <p className="text-muted mb-0">
            We would love to hear from you
          </p>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Information */}
            <div className="col-md-5">
              <h2 className="fw-bold mb-4">
                Get In Touch
              </h2>
              <p className="text-muted">
                Have a question or need help? Send us a message
                and our team will get back to you.
              </p>
              <div className="mt-4">
                <div className="d-flex gap-3 mb-4">
                  <i className="bi bi-geo-alt fs-4 text-primary"></i>
                  <div>
                    <h6 className="fw-bold mb-1">Address</h6>
                    <p className="text-muted mb-0">
                      Delhi, India
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3 mb-4">
                  <i className="bi bi-envelope fs-4 text-primary"></i>
                  <div>
                    <h6 className="fw-bold mb-1">Email</h6>
                    <p className="text-muted mb-0">
                      support@clickcart.com
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <i className="bi bi-telephone fs-4 text-primary"></i>
                  <div>
                    <h6 className="fw-bold mb-1">Phone</h6>
                    <p className="text-muted mb-0">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="col-md-7">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">
                    Send Us a Message
                  </h4>
                  <div className="row g-3">
                    {/* Name */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                      />
                    </div>
                    {/* Email */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                    </div>
                    {/* Subject */}
                    <div className="col-12">
                      <label className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter subject"
                      />
                    </div>
                    {/* Message */}
                    <div className="col-12">
                      <label className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Write your message..."
                      ></textarea>
                    </div>
                    {/* Button */}
                    <div className="col-12">
                      <button className="btn btn-primary">
                        <i className="bi bi-send me-2"></i>
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Contact;