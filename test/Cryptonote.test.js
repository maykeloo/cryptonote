

const Cryptonote = artifacts.require('Cryptonote.sol')

contract('Cryptonote', (accounts) => {
    //Check if the contract is initialized with 2 candidates
    describe("Cryptonote deployment tests", async () => {
        before(async () => {
            this.notes = await Cryptonote.deployed()
        })
        it("initialized correctly", async () => {
            const address = this.notes.address
            assert.notEqual(address,'0x0');
            assert.notEqual(address,'');
        })
        it("Check if contract have a default content", async () => {
            const note = this.notes.notes(1).id
            assert.notEqual(note,'');
        })
        it("Check note creation", async () => {
            const newNotes = await this.notes.createNotes('test');
            const noteCount = await this.notes.noteCount();
            assert.equal(noteCount,2)
        })
    })
})
