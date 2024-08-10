using System;
using System.Web;
using System.Web.UI;

namespace SE256_lab2_JF.Backend
{
    public partial class ControlPanel : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Debug: Check if the Page_Load is being hit
            System.Diagnostics.Debug.WriteLine("Page_Load called");

            if (Session["LoggedIn"] != null && Session["LoggedIn"].ToString() == "true")
            {
                // Debug: Log the session value
                System.Diagnostics.Debug.WriteLine("Session LoggedIn: " + Session["LoggedIn"].ToString());
            }
            else
            {
                // Debug: Log redirect event
                System.Diagnostics.Debug.WriteLine("Redirecting to Default.aspx");
                Response.Redirect("~/Backend/Default.aspx");
            }
        }

        protected void btnLogout_Click(object sender, EventArgs e)
        {
            Session.Abandon();
            Response.Redirect("~/Backend/Default.aspx");
        }
    }
}
