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

    <br />
    <br />

    <h1>Output option 2:</h1>
    <asp:Repeater ID="rptSearch" runat="server">
        <HeaderTemplate>
            <asp:Label ID="lblHeader" runat="server" Text="Your results: " />
            <br />
        </HeaderTemplate>
        <ItemTemplate>
            <div>
                <asp:Label ID="lblTitle" runat="server" Text='<%# Eval("Title") %>' />
                <br />
                <asp:Label ID="lblAuthorFirstName" runat="server" Text='<%# Eval("AuthorFirstName") %>' />
                <br />
                <asp:Label ID="lblAuthorLastName" runat="server" Text='<%# Eval("AuthorLastName") %>' />
                <br />
                <asp:Label ID="lblDatePublished" runat="server" Text='<%# Eval("DatePublished") %>' />
                <br />
                <asp:HyperLink ID="hlEdit" runat="server" Text="Edit" NavigateUrl='<%# Eval("ID", "~/Backend/EbookManager.aspx?ID={0}") %>' />
            </div>
            <br />
        </ItemTemplate>
    </asp:Repeater>



    <asp:Label ID="Label1" runat="server" />

    <asp:Label ID="feedback_label" runat="server" />
</asp:Content>
