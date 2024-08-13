using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SE256_activity_3_JaydenF.Backend
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void login_button_click(object sender, EventArgs e)
        {
            string username = username_input.Text;

            if (username == "Scott" && password_input.Text == "NEIT")
            {
                Session["username"] = username;
                Session["logged_in"] = true;
                feedback.Text = $"Successfully logged in!";
                Response.Redirect("~/Backend/ControlPanel.aspx");
            }
            else
            {
                Session["username"] = "";
                Session["logged_in"] = false;
                feedback.Text = "wrong username or password.";
            }
        }
    }
}