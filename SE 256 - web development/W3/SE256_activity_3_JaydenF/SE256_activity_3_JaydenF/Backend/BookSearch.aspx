<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="BookSearch.aspx.cs" Inherits="SE256_activity_3_JaydenF.Backend.BookSearch" %>
<asp:Content ID="Content1" ContentPlaceHolderID="BreakingNewsContent" runat="server">

</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Book Search</h1>
    <p>Optional Search Criteria</p>
    <p>
        Book Title: <asp:TextBox ID="txtTitle" runat="server" Columns="30" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        Author's Last Name: <asp:TextBox ID="txtAuthorLast" runat="server" Columns="30" />
    </p>
    <br />
    <asp:Button ID="btnSearch" runat="server" Text="Search" OnClick="btnSearch_Click" />
    <br />
    <br />


    <asp:DataGrid ID="dgResults" runat="server" AutoGenerateColumns="false" GridLines="Both" >
        <Columns>
            <asp:BoundColumn DataField="Title" HeaderText="Book Title" />
            <asp:BoundColumn DataField="AuthorFirstName" HeaderText="Author's First Name" />
            <asp:BoundColumn DataField="AuthorLastName" HeaderText="Author's Last Name" />
            <asp:BoundColumn DataField="DatePublished" HeaderText="Date Published" />
            <asp:HyperLinkColumn Text="Edit" DataNavigateUrlFormatString="~/Backend/EbookManager.aspx?Id={0}" DataNavigateUrlField="Id" />


        </Columns>
        
    </asp:DataGrid>
    <asp:Label ID="feedback_label" runat="server" />
</asp:Content>
