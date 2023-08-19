defmodule DragnCardsWeb.ReplayView do
  use DragnCardsWeb, :view
  alias DragnCardsWeb.ReplayView

  def render("index.json", %{replays: replays}) do
    IO.puts("replays.......................")
    IO.inspect(replays)
    %{data: render_many(replays, ReplayView, "replay.json")}
  end

  def render("show.json", %{replay: replay}) do
    %{data: render_one(replay, ReplayView, "replay.json")}
  end

  def render("replay.json", %{replay: replay}) do
    %{
      uuid: replay.uuid,
      deleted_by: replay.deleted_by,
      metadata: replay.metadata,
      #game_json: replay.game_json,
      updated_at: String.slice(NaiveDateTime.to_string(replay.updated_at), 0..15),
    }
  end
end
