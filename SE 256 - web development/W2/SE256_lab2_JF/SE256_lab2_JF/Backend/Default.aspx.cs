using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SE256_lab2_JF.Backend
{
    public partial class Default : System.Web.UI.Page
    {
        // Secured the credentials using variables
        private readonly string username = "Jayden";
        private readonly string password = "NEIT";

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            if (txtUname.Text == username && txtPW.Text == password)
            {
                Session["Uname"] = txtUname.Text;
                Session["LoggedIn"] = "true";
                lblFeedback.Text = "Login Successful!";
                Response.Redirect("~/Backend/ControlPanel.aspx");
            }
            else
            {
                Session["Uname"] = "";
                Session["LoggedIn"] = "false";
                lblFeedback.Text = "Login Failed!";
            }
        }
    }
}