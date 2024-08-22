using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SE256_activity_3_JaydenF.Backend
{
    public partial class ControlPanel : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["logged_in"] == null)
            {
                Response.Redirect("~/Backend/Default.aspx");
                return;
            }

            if ((bool)Session["logged_in"])
            {
                feedback_label.Text = $"Congrats, you succesfully logged in.";
            }
            else
            {
                Response.Redirect("~/Backend/Default.aspx");
            }
        }

        protected void logout_button_click(object sender, EventArgs e)
        {
            Session.Abandon();
            Response.Redirect("~/Backend/Default.aspx");
        }
    }
}