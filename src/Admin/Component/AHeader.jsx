import { Link } from "react-router-dom";

function AHeader() {
  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("aid");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/admin">
          🛒 Admin Panel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                📊 Dashboard
              </Link>
            </li>

            {/* Categories */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                📂 Categories
              </a>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/add_categories">
                    Add Category
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/manage_categories">
                    Manage Categories
                  </Link>
                </li>
              </ul>
            </li>

            {/* Products */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                📦 Products
              </a>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/add_products">
                    Add Product
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/manage_products">
                    Manage Products
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/manage_customers">
                👥 Customers
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/manage_contacts">
                📩 Contacts
              </Link>
            </li>

          </ul>

          {/* Profile Dropdown */}
          <ul className="navbar-nav">
            <li className="nav-item dropdown">

              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                👤 Admin
              </a>

              <ul className="dropdown-menu dropdown-menu-end">

                <li>
                  <Link className="dropdown-item" to="/admin-profile">
                    My Profile
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/settings">
                    Settings
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item text-danger" to="/Login" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>

              </ul>

            </li>
          </ul>

        </div>

      </div>
    </nav>
  );
}

export default AHeader;