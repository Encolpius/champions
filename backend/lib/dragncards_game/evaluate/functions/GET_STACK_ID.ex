defmodule DragnCardsGame.Evaluate.Functions.GET_STACK_ID do
  alias DragnCardsGame.Evaluate
  @moduledoc """
  *Arguments*:
  1. group_id (string)
  2. stack_index (number)

  Returns the stack id at the given stack_index in the group with the given group_id. If the group is null, it returns null.

  *Returns*:
  (string) The stack id at the given index in the group.

  *Examples*

  To get the leftmost stack id in your play area (supposing it's a group with the id 'player1PlayArea'):
  ```
  ["GET_STACK_ID", "playArea", 0]
  ```
  This is equivalent to:
  ```
  "$GAME.groupById.{{$PLAYER_N}}Deck.stackIds.[0]"
  ```

  """

  @doc """
  Executes the 'GET_STACK_ID' operation with the given arguments.

  ## Parameters

    - `args`: The arguments required for the 'GET_STACK_ID' operation.

  ## Returns

  The result of the 'GET_STACK_ID' operation.
  """
  def execute(game, code, trace) do
    group_id = Evaluate.evaluate(game, Enum.at(code,1), trace ++ ["group_id"])
    stack_index = Evaluate.evaluate(game, Enum.at(code,2), trace ++ ["stack_index"])
    if group_id do Evaluate.evaluate(game, ["AT_INDEX", "$GAME.groupById." <> group_id <> ".stackIds", stack_index], trace) else nil end
  end


end
