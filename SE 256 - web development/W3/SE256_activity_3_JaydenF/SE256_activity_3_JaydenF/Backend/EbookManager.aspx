<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="EbookManager.aspx.cs" Inherits="SE256_activity_3_JaydenF.Backend.EbookManager" %>
<asp:Content ID="Content1" ContentPlaceHolderID="BreakingNewsContent" runat="server">
    <a href="~/Backend/ControlPanel.aspx" runat="server">Return to control panel</a>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <table>
        <tr>
            <td>book id</td>
            <td><asp:Label ID="book_id" runat="server" /></td>
        </tr>

        <tr>
            <td>Book Title</td>
            <td><asp:TextBox ID="book_title" runat="server" MaxLength="255" /></td>
        </tr>
        
        <tr>
            <td>Author's first name</td>
            <td><asp:TextBox ID="author_first_name" runat="server" MaxLength="20" /></td>
        </tr>


        <tr>
            <td>Author's last name</td>
            <td><asp:TextBox ID="author_last_name" runat="server" MaxLength="40" /></td>
        </tr>

        <tr>
            <td>Author's email</td>
            <td><asp:TextBox ID="author_email" runat="server" MaxLength="40" /></td>
        </tr>

        <tr>
            <td>Date Published</td>
            <td><asp:Calendar ID="date_published" runat="server" /></td>
        </tr>

        <tr>
            <td>Number of Pages</td>
            <td><asp:TextBox ID="number_of_pages" runat="server" MaxLength="5" /></td>
        </tr>

        <tr>
            <td>Price per copy</td>
            <td><asp:TextBox ID="price_per_copy" runat="server" MaxLength="10" /></td>
        </tr>
    </table>
    <asp:Button ID="submit_button" runat="server" Text="Add" OnClick="submit_button_click" />
    <asp:Button ID="update_button" runat="server" Text="Update" OnClick="update_button_Click" />
    <asp:Label ID="feedback_label" runat="server" />
</asp:Content>
