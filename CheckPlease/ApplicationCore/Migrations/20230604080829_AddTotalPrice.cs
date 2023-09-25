using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationCore.Migrations
{
    public partial class AddTotalPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OverallDetailPrice",
                table: "Details",
                newName: "DetailsPrice");

            migrationBuilder.AddColumn<int>(
                name: "TotalPrice",
                table: "Details",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Details");

            migrationBuilder.RenameColumn(
                name: "DetailsPrice",
                table: "Details",
                newName: "OverallDetailPrice");
        }
    }
}
