using Microsoft.EntityFrameworkCore.Migrations;

namespace TrainingDiary.Data.Migrations
{
    public partial class AddedSessionTableEditedAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ExcercisesJson",
                table: "Session",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Excercise",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Sets = table.Column<int>(nullable: false),
                    Reps = table.Column<int>(nullable: false),
                    Rpe = table.Column<int>(nullable: false),
                    WeightLifted = table.Column<int>(nullable: false),
                    SessionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Excercise", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Excercise_Session_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Session",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Excercise_SessionId",
                table: "Excercise",
                column: "SessionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Excercise");

            migrationBuilder.DropColumn(
                name: "ExcercisesJson",
                table: "Session");
        }
    }
}
