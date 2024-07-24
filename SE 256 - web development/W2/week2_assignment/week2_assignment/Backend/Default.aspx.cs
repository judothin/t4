using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace week2_assignment.Backend
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            if (txtUname.Text == "Scott" && txtPW.Text == "NEIT")
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